using Domain.Enums;

namespace Domain.DAL.CartItems
{
	public class AddItemToCartRequest
	{
		public int NomenclatureId { get; set; }
		public Guid StockId { get; set; }
		public ScaleType Scale { get; set; }
		public decimal Quantity { get; set; }
		public int UserId { get; set; }
	}
}
