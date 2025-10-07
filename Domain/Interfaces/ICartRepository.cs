using Domain.DAL.CartItems;
using Domain.Entities;

namespace Domain.Interfaces
{
	public interface ICartRepository
	{
		Task<Cart> GetCart(int userId, CancellationToken cancellationToken = default);

		Task<Cart> GetCartNoTrack(int userId, CancellationToken cancellationToken = default);

		Task<ICollection<CartItem>> GetCartItems(int userId, CancellationToken cancellationToken);

		Task ClearCart(int userId, CancellationToken cancellationToken);

		Task AddItemToCart(AddItemToCartRequest request, CancellationToken cancellationToken);

		Task ChangeQuantity(ChangeQuantityCartItemRequest request, CancellationToken cancellationToken);

		Task DeleteCartItem(DeleteCartItemRequest request, CancellationToken cancellationToken);

		Task<decimal> CountCartAmount(int userId, CancellationToken cancellationToken);
	}
}
