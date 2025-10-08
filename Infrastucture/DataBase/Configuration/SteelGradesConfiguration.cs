using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class SteelGradesConfiguration : IEntityTypeConfiguration<SteelGrade>
	{
		public void Configure(EntityTypeBuilder<SteelGrade> builder)
		{
			builder.ToTable("SteelGrades");

			builder.HasKey(sg => sg.Id);
		}
	}
}
