using Domain.Enums;

namespace Domain.Entities
{
	public class CartItem
	{
		public int CartItemId { get; set; }
		public Nomenclature Nomenclature { get; set; } = null!;
		public int NomenclatureId { get; set; }
		public Stock Stock { get; set; } = null!;
		public Guid StockId { get; set; }
		public decimal Quantity { get; set; }
		public ScaleType Scale { get; set; }
		public decimal Amount { get; set; }
		public Cart? Cart { get; set; }
		public int? CartId { get; set; }
		public Order? Order { get; set; }
		public int? OrderId { get; set; }
	}
}
