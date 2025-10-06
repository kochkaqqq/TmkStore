namespace Domain.Entities
{
	public class Order
	{
		public int Id { get; set; }
		public User User { get; set; } = null!;
		public Cart Cart { get; set; } = null!;
	}
}
