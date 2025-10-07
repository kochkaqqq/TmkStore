using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class GostConfiguration : IEntityTypeConfiguration<Gost>
	{
		public void Configure(EntityTypeBuilder<Gost> builder)
		{
			builder.ToTable("Gosts");

			builder.HasKey(g => g.IdGost);
		}
	}
}
