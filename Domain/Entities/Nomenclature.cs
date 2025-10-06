using Domain.Enums;

namespace Domain.Entities
{
	public class Nomenclature
	{
		public int IdNomenclature { get; set; }
		public Category Category { get; set; } = null!;
		public Type Type { get; set; }
		public int IDTypeNew { get; set; }
		public string ProductionType { get; set; } = null!;
		public int IDFunctionType { get; set; }
		public string Name { get; set; } = null!;
		public ICollection<Gost>? Gosts { get; set; }
		public int FormOfLength { get; set; }
		public string? Manufacturer { get; set; }
		public string? SteelGrade { get; set; }
		public int Diameter { get; set; }
		public int ProfileSize2 { get; set; }
		public int PipeWallThickness { get; set; }
		public NomenclatureStatus Status { get; set; }
		public decimal Koef { get; set; }
	}
}
