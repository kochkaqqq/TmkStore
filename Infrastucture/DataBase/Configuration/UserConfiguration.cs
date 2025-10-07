using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastucture.DataBase.Configuration
{
	public class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.ToTable("Users");

			builder.HasKey(u => u.UserId);

			builder.Property(u => u.UserId)
				.ValueGeneratedOnAdd();

			builder.Property(u => u.Name)
				.IsRequired()
				.HasMaxLength(100);

			builder.Property(u => u.Surname)
				.IsRequired()
				.HasMaxLength(100);

			builder.Property(u => u.Inn)
				.IsRequired()
				.HasMaxLength(20);

			builder.Property(u => u.Phone)
				.IsRequired()
				.HasMaxLength(20);

			builder.Property(u => u.Email)
				.IsRequired()
				.HasMaxLength(255);

			builder.HasIndex(u => u.Inn).IsUnique();
			builder.HasIndex(u => u.Email).IsUnique();
			builder.HasIndex(u => u.Phone).IsUnique();
		}
	}
}