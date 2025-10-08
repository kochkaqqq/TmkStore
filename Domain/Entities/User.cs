namespace Domain.Entities
{
	public class User
	{
		public Guid UserId { get; set; }
		public string Name { get; set; } = null!;
		public string Surname { get; set; } = null!;
		public string Inn { get; set; } = null!;
		public string Phone { get; set; } = null!;
		public string Email { get; set; } = null!;
	}
}
