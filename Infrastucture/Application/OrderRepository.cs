using Domain.DAL.Orders;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class OrderRepository : IOrderRepository
	{
		private readonly IDbContext _dbContext;
		private readonly IPriceRepository _priceRepository;

		public OrderRepository(IDbContext dbContext, IPriceRepository priceRepository)
		{
			_dbContext = dbContext;
			_priceRepository = priceRepository;
		}

		public async Task<Guid> AddOrder(CreateOrderRequest request, CancellationToken cancellationToken)
		{
			var user = new User()
			{
				Name = request.FirstName,
				Surname = request.LastName,
				Email = request.Email,
				Phone = request.Phone,
				Inn = request.INN,
			};

			await _dbContext.Users.AddAsync(user);

			var items = new List<CartItem>();

			foreach (var item in request.Items)
			{
				var amount = await _priceRepository.CountAmount(item.NomenclatureId, item.StockId, item.Quantity, item.ScaleType);

				var newCartItem = new CartItem()
				{
					NomenclatureId = item.NomenclatureId,
					StockId = item.StockId,
					Scale = item.ScaleType,
					Quantity = item.Quantity,
					Amount = amount,
				};

				await _dbContext.CartItems.AddAsync(newCartItem);
				items.Add(newCartItem);
			}

			var order = new Order()
			{
				User = user,
				Items = items,
				Amount = items.Select(x => x.Amount).Sum()
			};

			await _dbContext.Orders.AddAsync(order);
			await _dbContext.SaveChangesAsync(cancellationToken);

			return order.Id;
		}

		public async Task<ICollection<Order>> GetAllUserOrders(Guid userId, CancellationToken cancellationToken)
		{
			return await _dbContext.Orders.AsNoTracking().Where(o => o.User.UserId == userId).ToArrayAsync(cancellationToken);
		}

		public async Task<Order> GetOrder(Guid orderId, CancellationToken cancellationToken)
		{
			return await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == orderId)
				?? throw new NotFound();
		}
	}
}
