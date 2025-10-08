using Domain.Enums;

namespace Domain.Entities
{
	public class CartItem
	{
		public Guid CartItemId { get; set; }
		public Nomenclature Nomenclature { get; set; } = null!;
		public string NomenclatureId { get; set; } = null!;
		public Stock Stock { get; set; } = null!;
		public Guid StockId { get; set; }
		public decimal Quantity { get; set; }
		public ScaleType Scale { get; set; }
		public decimal Amount { get; set; }
		public Cart? Cart { get; set; }
		public Guid? CartId { get; set; }
		public Order? Order { get; set; }
		public Guid? OrderId { get; set; }
	}
}
