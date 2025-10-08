namespace Domain.Entities
{
	public class Gost
	{
		public Guid IdGost { get; set; }
		public string Title { get; set; } = null!;
		public string? Link { get; set; }
	}
}
