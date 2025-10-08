using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class ManufacturerConfiguration : IEntityTypeConfiguration<Manufacturer>
	{
		public void Configure(EntityTypeBuilder<Manufacturer> builder)
		{
			builder.ToTable("Manufacturers");

			builder.HasKey(m => m.Id);
		}
	}
}
