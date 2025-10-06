namespace Domain.Entities
{
	public class Stock
	{
		public Guid StockId { get; set; }
		public string City { get; set; } = null!;
		public string StockName { get; set; } = null!;
		public string? Address { get; set; }
	}
}
