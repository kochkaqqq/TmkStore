using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class PriceConfiguration : IEntityTypeConfiguration<Price>
	{
		public void Configure(EntityTypeBuilder<Price> builder)
		{
			builder.ToTable("Prices");

			builder.HasKey(p => new { p.NomenclatureId, p.StockId });

			builder.Property(p => p.PriceT)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceLimitT1)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceT1)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceLimitT2)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceT2)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceM)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceLimitM1)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceM1)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceLimitM2)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.PriceM2)
				.HasColumnType("numeric(18,2)");

			builder.Property(p => p.NDS)
				.HasColumnType("numeric(5,2)");

			builder.HasOne(p => p.Nomenclature)
				.WithMany()
				.HasForeignKey(p => p.NomenclatureId)
				.IsRequired()
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(p => p.Stock)
				.WithMany()
				.HasForeignKey(p => p.StockId)
				.IsRequired()
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}