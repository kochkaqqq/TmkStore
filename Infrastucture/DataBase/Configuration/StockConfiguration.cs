using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class StockConfiguration : IEntityTypeConfiguration<Stock>
	{
		public void Configure(EntityTypeBuilder<Stock> builder)
		{
			builder.ToTable("Stocks");

			builder.HasKey(s => s.StockId);

			builder.Property(s => s.StockId)
				.ValueGeneratedOnAdd();

			builder.Property(s => s.City)
				.IsRequired()
				.HasMaxLength(100);

			builder.Property(s => s.StockName)
				.IsRequired()
				.HasMaxLength(200);

			builder.Property(s => s.Address)
				.HasMaxLength(500);
		}
	}
}