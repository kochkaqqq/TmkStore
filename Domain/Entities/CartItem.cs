using Domain.Enums;

namespace Domain.Entities
{
	public class CartItem
	{
		public int NomenclatureId { get; set; }
		public decimal Quantity { get; set; }
		public ScaleType Scale { get; set; }
		public decimal Amount { get; set; }
		public Cart Cart { get; set; } = null!;
	}
}
