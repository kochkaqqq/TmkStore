namespace Domain.DAL.CartItems
{
	public class DeleteCartItemRequest
	{
		public int UserId { get; set; }
		public int NomenclatureId { get; set; }
		public Guid StockId { get; set; }
	}
}
