using Domain.Enums;

namespace Domain.DAL.CartItems
{
	public class AddItemToCartRequest
	{
		public string NomenclatureId { get; set; }
		public Guid StockId { get; set; }
		public ScaleType Scale { get; set; }
		public decimal Quantity { get; set; }
		public Guid UserId { get; set; }
	}
}
