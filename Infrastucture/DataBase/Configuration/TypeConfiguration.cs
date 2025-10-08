using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class TypeConfiguration : IEntityTypeConfiguration<Domain.Entities.Type>
	{
		public void Configure(EntityTypeBuilder<Domain.Entities.Type> builder)
		{
			builder.ToTable("Types");

			builder.HasKey(t => t.IDType);

			builder.Property(t => t.IDType)
				.ValueGeneratedOnAdd();

			builder.Property(t => t.PipeType)
				.IsRequired()
				.HasMaxLength(200);

			builder.Property(t => t.IDParentType)
				.HasMaxLength(50);
		}
	}
}