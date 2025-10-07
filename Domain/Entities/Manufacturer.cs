using System.Text.Json.Serialization;

namespace Domain.Entities
{
	public class Manufacturer
	{
		public int Id { get; set; }	
		public string Name { get; set; } = null!;
		public string? Address { get; set; }

		[JsonIgnore]
		public ICollection<Nomenclature> Nomenclatures { get; set; }
	}
}
