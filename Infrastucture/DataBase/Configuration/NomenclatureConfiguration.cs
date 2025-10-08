using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace Infrastucture.DataBase.Configuration
{
	public class NomenclatureConfiguration : IEntityTypeConfiguration<Nomenclature>
	{
		public void Configure(EntityTypeBuilder<Nomenclature> builder)
		{
			builder.ToTable("Nomenclatures");

			builder.HasKey(n => n.IdNomenclature);

			builder.Property(n => n.IdNomenclature)
				.ValueGeneratedOnAdd();

			builder.Property(n => n.CategoryId)
				.IsRequired();

			builder.Property(n => n.IDTypeNew)
				.IsRequired();

			builder.Property(n => n.ProductionType)
				.IsRequired()
				.HasMaxLength(200);

			builder.Property(n => n.Name)
				.IsRequired()
				.HasMaxLength(500);

			builder.Property(n => n.FormOfLength)
				.HasColumnType("text")
				.IsRequired();

			builder.Property(n => n.Diameter)
				.HasColumnType("numeric(18,3)")
				.IsRequired();

			builder.Property(n => n.ProfileSize2)
				.HasColumnType("numeric(18,3)")
				.IsRequired();

			builder.Property(n => n.PipeWallThickness)
				.HasColumnType("numeric(18,3)")
				.IsRequired();

			builder.Property(n => n.Status)
				.IsRequired();

			builder.Property(n => n.Koef)
				.HasColumnType("numeric(18,6)")
				.IsRequired();

			builder.HasOne(n => n.Type)
				.WithMany()
				.IsRequired()
				.OnDelete(DeleteBehavior.Restrict);

			builder.HasMany(n => n.Gosts)
				.WithMany()
				.UsingEntity(j => j.ToTable("NomenclatureGosts"));

			builder.HasOne(n => n.SteelGrade).WithMany(s => s.Nomenclatures).IsRequired().HasForeignKey(n => n.SteelGradeId).OnDelete(DeleteBehavior.Restrict);

			builder.HasOne(n => n.Manufacturer).WithMany(m => m.Nomenclatures).HasForeignKey(n => n.ManufactureId).OnDelete(DeleteBehavior.Restrict);
		}
	}
}