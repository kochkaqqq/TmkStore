using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class RemnantsConfiguration : IEntityTypeConfiguration<Remnants>
	{
		public void Configure(EntityTypeBuilder<Remnants> builder)
		{
			builder.ToTable("Remnants");

			builder.HasKey(r => new { r.NomenclatureId, r.StockId });

			builder.Property(r => r.InStockT)
				.HasColumnType("numeric(18,3)");

			builder.Property(r => r.InStockM)
				.HasColumnType("numeric(18,3)");

			builder.Property(r => r.SoonArriveT)
				.HasColumnType("numeric(18,3)");

			builder.Property(r => r.SoonArriveM)
				.HasColumnType("numeric(18,3)");

			builder.Property(r => r.ReservedT)
				.HasColumnType("numeric(18,3)");

			builder.Property(r => r.ReservedM)
				.HasColumnType("numeric(18,3)");

			builder.Property(r => r.UnderTheOrder)
				.IsRequired();

			builder.Property(r => r.AvgTubeLength)
				.HasColumnType("numeric(18,3)");

			builder.Property(r => r.AvgTubeWeight)
				.HasColumnType("numeric(18,3)");

			builder.HasOne(r => r.Nomenclature)
				.WithMany(n => n.Remnants)
				.HasForeignKey(r => r.NomenclatureId)
				.IsRequired()
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(r => r.Stock)
				.WithMany()
				.HasForeignKey(r => r.StockId)
				.IsRequired()
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}