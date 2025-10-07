namespace Domain.DAL.CartItems
{
	public class ChangeQuantityCartItemRequest
	{
		public int UserId { get; set; }
		public int NomenclatureId { get; set; }
		public Guid StockId { get; set; }
		public decimal QuantityChange { get; set; }
	}
}
