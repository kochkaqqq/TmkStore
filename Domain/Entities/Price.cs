namespace Domain.Entities
{
	public class Price
	{
		public int NomenclatureId { get; set; }
		public Nomenclature Nomenclature { get; set; } = null!;
		public Guid StockId { get; set; }
		public Stock Stock { get; set; } = null!;
		public decimal PriceT {  get; set; }
		public decimal PriceLimitT1 { get; set; }
		public decimal PriceT1 { get; set; }
		public decimal PriceLimitT2 { get; set; }
		public decimal PriceT2 { get; set; }
		public decimal PriceM { get; set; }
		public decimal PriceLimitM1 { get; set; }
		public decimal PriceM1 { get; set; }
		public decimal PriceLimitM2 { get; set; }
		public decimal PriceM2 { get; set; }
		public decimal NDS { get; set; }
	}
}
