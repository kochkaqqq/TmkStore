using Domain.Enums;

namespace Domain.Entities
{
	public class Nomenclature
	{
		public int IdNomenclature { get; set; }
		public int CategoryId { get; set; }
		public Type Type { get; set; } = null!;
		public int IDTypeNew { get; set; }
		public string ProductionType { get; set; } = null!;
		public int IDFunctionType { get; set; }
		public string Name { get; set; } = null!;
		public ICollection<string>? Gosts { get; set; }
		public decimal FormOfLength { get; set; }
		public string? Manufacturer { get; set; }
		public string SteelGrade { get; set; } = null!;
		public decimal Diameter { get; set; }
		public decimal ProfileSize2 { get; set; }
		public decimal PipeWallThickness { get; set; }
		public NomenclatureStatus Status { get; set; }
		public decimal Koef { get; set; }
	}
}
