using System.Text.Json.Serialization;

namespace Domain.Entities
{
	public class Remnants
	{
		public string NomenclatureId { get; set; } = null!;
		[JsonIgnore]
		public Nomenclature Nomenclature { get; set; } = null!;
		public Guid StockId { get; set; }
		public Stock Stock { get; set; } = null!;
		public decimal InStockT { get; set; }
		public decimal InStockM { get; set; }
		public decimal SoonArriveT { get; set; }
		public decimal SoonArriveM { get; set; }
		public decimal ReservedT { get; set; }
		public decimal ReservedM { get; set; }
		public bool UnderTheOrder { get; set; }
		public decimal AvgTubeLength { get; set; }
		public decimal AvgTubeWeight { get; set; }
	}
}
