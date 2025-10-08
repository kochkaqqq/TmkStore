namespace Domain.DAL.CartItems
{
	public class DeleteCartItemRequest
	{
		public Guid UserId { get; set; }
		public string NomenclatureId { get; set; } = null!;
		public Guid StockId { get; set; }
	}
}
