namespace Domain.Entities
{
	public class Cart
	{
		public int CartId { get; set; }
		public User User { get; set; } = null!;
		public ICollection<CartItem> Items { get; set; } = null!;
		public decimal Amount { get; set; }
	}
}
