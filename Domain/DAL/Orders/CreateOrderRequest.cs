using Domain.Enums;

namespace Domain.DAL.Orders
{
	public class CreateOrderRequest
	{
		public string FirstName { get; set; } = null!;
		public string LastName { get; set; } = null!;
		public string INN { get; set; } = null!;
		public string Phone { get; set; } = null!;
		public string Email { get; set; } = null!;
		public string Address { get; set; } = null!;
		public string Notes { get; set; } = null!;

		public ICollection<Item> Items { get; set; } = null!;
	}

	public class Item
	{
		public string NomenclatureId { get; set; } = null!;
		public Guid StockId { get; set; }
		public ScaleType ScaleType { get; set; }
		public decimal Quantity { get; set; }
	}
}
