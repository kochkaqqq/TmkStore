using Domain.DAL.CartItems;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Infrastucture.Application
{
	public class CartRepository : ICartRepository
	{
		private readonly IDbContext _dbContext;
		private readonly IPriceRepository _priceRepository;
		private readonly INomenclatureRepository _nomenclatureRepository;
		private readonly IStockRepository _stockRepository;
		private readonly IUserRepository _userRepository;

		public CartRepository(IDbContext dbContext, IPriceRepository priceRepository, INomenclatureRepository nomenclatureRepository, 
			IStockRepository stockRepository, IUserRepository userRepository)
		{
			_dbContext = dbContext;
			_priceRepository = priceRepository;
			_nomenclatureRepository = nomenclatureRepository;
			_stockRepository = stockRepository;
			_userRepository = userRepository;
		}

		//TODO Check Remnants
		public async Task AddItemToCart(AddItemToCartRequest request, CancellationToken cancellationToken)
		{
			var amount = await _priceRepository.CountAmount(request.NomenclatureId, request.StockId, request.Quantity, request.Scale);

			var nomenclature = await _nomenclatureRepository.GetNomenclature(request.NomenclatureId);

			var stock = await _stockRepository.GetStock(request.StockId);

			var cart = await GetCart(request.UserId);

			var cartItem = new CartItem()
			{
				Nomenclature = nomenclature,
				Stock = stock,
				NomenclatureId = nomenclature.IdNomenclature,
				StockId = stock.StockId,
				Quantity = request.Quantity,
				Scale = request.Scale,
				Amount = amount,
				Cart = cart
			};

			await _dbContext.CartItems.AddAsync(cartItem);
			await _dbContext.SaveChangesAsync(cancellationToken);
		}

		//TODO Check Remnants
		public async Task ChangeQuantity(ChangeQuantityCartItemRequest request, CancellationToken cancellationToken)
		{
			var cartItems = await GetCartItems(request.UserId, cancellationToken);
			var item = cartItems.FirstOrDefault(ci => ci.NomenclatureId == request.NomenclatureId && ci.StockId == request.StockId)
				?? throw new NotFound();

			if (item.Quantity + request.QuantityChange <= 0)
			{
				_dbContext.CartItems.Remove(item);
			}
			else
			{
				item.Quantity += request.QuantityChange;
				item.Amount = await _priceRepository.CountAmount(item.NomenclatureId, item.StockId, item.Quantity, item.Scale);
			}

			await _dbContext.SaveChangesAsync(cancellationToken);
		}

		public async Task ClearCart(Guid userId, CancellationToken cancellationToken)
		{
			var cart = await GetCart(userId, cancellationToken);
			_dbContext.Carts.Remove(cart);
			await _dbContext.SaveChangesAsync(cancellationToken);
		}

		public async Task<decimal> CountCartAmount(Guid userId, CancellationToken cancellationToken)
		{
			var cart = await GetCartNoTrack(userId, cancellationToken);
			decimal res = 0;
			foreach (var item in cart.Items)
			{
				res += item.Amount;
			}
			return res;
		}

		public async Task DeleteCartItem(DeleteCartItemRequest request, CancellationToken cancellationToken)
		{
			var cart = await GetCartItems(request.UserId, cancellationToken);
			var item = cart.FirstOrDefault(ci => ci.NomenclatureId == request.NomenclatureId && ci.StockId == request.StockId)
				?? throw new NotFound();
			_dbContext.CartItems.Remove(item);
			await _dbContext.SaveChangesAsync(cancellationToken);
		}

		public async Task<Cart> GetCart(Guid userId, CancellationToken cancellationToken = default)
		{
			var cart = await _dbContext.Carts
				.Include(c => c.Items)
				.FirstOrDefaultAsync(c => c.User.UserId == userId, cancellationToken);

			if (cart != null) 
				return cart;


			var user = await _userRepository.GetUser(userId);
			cart = new Cart()
			{
				User = user,
				Items = [],
				Amount = 0,
			};

			return cart;
		}

		public async Task<Cart> GetCartNoTrack(Guid userId, CancellationToken cancellationToken = default)
		{
			var cart = await _dbContext.Carts
				.AsNoTracking()
				.Include(c => c.Items)
				.FirstOrDefaultAsync(c => c.User.UserId == userId, cancellationToken);

			if (cart != null)
				return cart;


			var user = await _userRepository.GetUser(userId);
			cart = new Cart()
			{
				User = user,
				Items = [],
				Amount = 0,
			};

			return cart;
		}

		public async Task<ICollection<CartItem>> GetCartItems(Guid userId, CancellationToken cancellationToken)
		{
			var cart = await GetCart(userId);

			return cart.Items;
		}
	}
}
