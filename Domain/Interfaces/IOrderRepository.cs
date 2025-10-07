using Domain.DAL.Orders;
using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IOrderRepository
	{
		Task<int> AddOrder(CreateOrderRequest request, CancellationToken cancellationToken);

		Task<ICollection<Order>> GetAllUserOrders(int userId, CancellationToken cancellationToken);

		Task<Order> GetOrder(int orderId, CancellationToken cancellationToken);
	}
}
