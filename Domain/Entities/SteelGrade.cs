using System.Text.Json.Serialization;

namespace Domain.Entities
{
	public class SteelGrade
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = null!;

		[JsonIgnore]
		public ICollection<Nomenclature> Nomenclatures { get; set; }
	}
}
