using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class CartConfiguration : IEntityTypeConfiguration<Cart>
	{
		public void Configure(EntityTypeBuilder<Cart> builder)
		{
			builder.ToTable("Carts");

			builder.HasKey(c => c.CartId);

			builder.Property(c => c.CartId)
				.ValueGeneratedOnAdd();

			builder.Property(c => c.Amount)
				.HasColumnType("decimal(18,2)")
				.IsRequired();

			builder.HasOne(c => c.User)
				.WithMany() 
				.HasForeignKey("UserId")
				.IsRequired()
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(c => c.Items)
				.WithOne() 
				.HasForeignKey("CartId")
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasIndex("UserId")
				.HasDatabaseName("IX_Carts_UserId");
		}
	}
}