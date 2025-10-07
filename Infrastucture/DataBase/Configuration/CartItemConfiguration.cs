using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
	{
		public void Configure(EntityTypeBuilder<CartItem> builder)
		{
			builder.ToTable("CartItems");

			builder.HasKey(ci => ci.CartItemId);

			builder.Property(ci => ci.CartItemId)
				.ValueGeneratedOnAdd();

			builder.HasOne(ci => ci.Nomenclature)
				.WithMany()
				.HasForeignKey(ci => ci.NomenclatureId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(ci => ci.Stock)
				.WithMany()
				.HasForeignKey(ci => ci.StockId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.Property(ci => ci.Quantity)
				.HasColumnType("numeric(18,3)")
				.IsRequired();

			builder.Property(ci => ci.Scale)
				.IsRequired();

			builder.Property(ci => ci.Amount)
				.HasColumnType("numeric(18,2)")
				.IsRequired();

			builder.HasOne(ci => ci.Cart)
				.WithMany(c => c.Items)
				.HasForeignKey(ci => ci.CartId)
				.IsRequired(false)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(ci => ci.Order)
				.WithMany(o => o.Items)
				.HasForeignKey(ci => ci.OrderId)
				.IsRequired(false)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasIndex(ci => ci.CartId);
			builder.HasIndex(ci => ci.OrderId);
			builder.HasIndex(ci => ci.NomenclatureId);
		}
	}
}