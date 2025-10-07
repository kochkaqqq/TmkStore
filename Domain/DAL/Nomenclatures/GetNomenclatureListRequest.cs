using Domain.Entities;
using Domain.Enums;

namespace Domain.DAL.Nomenclatures
{
	public class GetNomenclatureListRequest
	{
		public Guid? StockId { get; set; }
		public string? Name { get; set; }
		public decimal? Diameter { get; set; }
		public decimal? PipeWallThickness { get; set; }
		public string? Gost { get; set; }
		public string? SteelGrade { get; set; }
		public int Page { get; set; }
		public int ItemPerPage { get; set; } = 25;
	}
}
