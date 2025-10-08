using Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
	public class Nomenclature
	{
		public string IdNomenclature { get; set; } = null!;
		public int CategoryId { get; set; }
		public Type Type { get; set; } = null!;
		public string IDTypeNew { get; set; }
		public string ProductionType { get; set; } = null!;
		public int? IDFunctionType { get; set; }
		public string Name { get; set; } = null!;
		public ICollection<Gost> Gosts { get; set; }
		public string FormOfLength { get; set; }
		public Manufacturer Manufacturer { get; set; } = null!;
		public Guid ManufactureId { get; set; }
		public SteelGrade SteelGrade { get; set; } = null!;
		public Guid SteelGradeId { get; set; }
		public decimal Diameter { get; set; }
		public decimal ProfileSize2 { get; set; }
		public decimal PipeWallThickness { get; set; }
		public NomenclatureStatus Status { get; set; }
		public decimal Koef { get; set; }
		[JsonPropertyName("Availability")]
		public ICollection<Remnants> Remnants { get; set; } = null!;
	}
}
