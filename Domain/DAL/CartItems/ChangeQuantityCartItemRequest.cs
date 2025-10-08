namespace Domain.DAL.CartItems
{
	public class ChangeQuantityCartItemRequest
	{
		public Guid UserId { get; set; }
		public string NomenclatureId { get; set; } = null!;
		public Guid StockId { get; set; }
		public decimal QuantityChange { get; set; }
	}
}
