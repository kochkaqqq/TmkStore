using Domain.Entities;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class SteelGradeRepository : ISteelGradesRepository
	{
		private readonly IDbContext _dbContext;

		public SteelGradeRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<ICollection<SteelGrade>> GetSteelGrades(CancellationToken cancellationToken)
		{
			return await _dbContext.SteelGrades.AsNoTracking().ToArrayAsync(cancellationToken);
		}
	}
}
