namespace Domain.Entities
{
	public class Stock
	{
		public Guid StockId { get; set; }
		public string? City { get; set; }
		public string StockName { get; set; } = null!;
		public string? Address { get; set; }
	}
}
