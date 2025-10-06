using Domain.Entities;

namespace Domain.Interfaces
{
	public interface ICartRepository
	{
		ICollection<CartItem> GetCartItems(int userId);

		void ClearCart(int userId);

		void AddItemToCart(CartItem mCartItem);

		void ChangeQuantity(int cartId, int cartItemId, decimal quantityChange);

		void DeleteCartItem(int cartId, int cartItemId);

		void CountCartAmount(int cartId);
	}
}
