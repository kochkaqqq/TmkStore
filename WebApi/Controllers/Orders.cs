using Domain.DAL.Orders;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
	public class Orders : Controller
	{
		private readonly IOrderRepository _orderRepository;

		public Orders(IOrderRepository orderRepository)
		{
			_orderRepository = orderRepository;
		}

		[HttpPost("/orders")]
		public async Task<IActionResult> PostOrder([FromBody] CreateOrderRequest request, CancellationToken cancellationToken)
		{
			var res = await _orderRepository.AddOrder(request, cancellationToken);
			return Ok(res);
		}
	}
}
