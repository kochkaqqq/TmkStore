using Domain.DAL.CartItems;
using Domain.Entities;

namespace Domain.Interfaces
{
	public interface ICartRepository
	{
		Task<Cart> GetCart(Guid userId, CancellationToken cancellationToken = default);

		Task<Cart> GetCartNoTrack(Guid userId, CancellationToken cancellationToken = default);

		Task<ICollection<CartItem>> GetCartItems(Guid userId, CancellationToken cancellationToken);

		Task ClearCart(Guid userId, CancellationToken cancellationToken);

		Task AddItemToCart(AddItemToCartRequest request, CancellationToken cancellationToken);

		Task ChangeQuantity(ChangeQuantityCartItemRequest request, CancellationToken cancellationToken);

		Task DeleteCartItem(DeleteCartItemRequest request, CancellationToken cancellationToken);

		Task<decimal> CountCartAmount(Guid userId, CancellationToken cancellationToken);
	}
}
