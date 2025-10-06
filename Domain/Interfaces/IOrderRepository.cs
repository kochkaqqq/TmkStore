using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IOrderRepository
	{
		int AddOrder(int userId, int? cartId);

		ICollection<Order> GetAllUserOrders(int userId);

		Order GetOrder(int orderId);
	}
}
