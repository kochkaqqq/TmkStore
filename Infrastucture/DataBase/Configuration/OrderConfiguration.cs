using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class OrderConfiguration : IEntityTypeConfiguration<Order>
	{
		public void Configure(EntityTypeBuilder<Order> builder)
		{
			builder.ToTable("Orders");

			builder.HasKey(o => o.Id);

			builder.Property(o => o.Id)
				.ValueGeneratedOnAdd();

			builder.Property(o => o.Amount)
				.HasColumnType("numeric(18,2)")
				.IsRequired();

			builder.HasOne(o => o.User)
				.WithMany()
				.HasForeignKey("UserId")
				.IsRequired()
				.OnDelete(DeleteBehavior.Restrict);

			builder.HasMany(o => o.Items)
				.WithOne(ci => ci.Order)
				.HasForeignKey("OrderId")
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}