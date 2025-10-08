using Domain.DAL.Orders;
using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IOrderRepository
	{
		Task<Guid> AddOrder(CreateOrderRequest request, CancellationToken cancellationToken);

		Task<ICollection<Order>> GetAllUserOrders(Guid userId, CancellationToken cancellationToken);

		Task<Order> GetOrder(Guid orderId, CancellationToken cancellationToken);
	}
}
