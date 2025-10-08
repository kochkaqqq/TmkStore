namespace Domain.Entities
{
	public class Type
	{
		public Guid IDType { get; set; }
		public string PipeType { get; set; } = null!;
		public string? IDParentType { get; set; } = null;
	}
}
