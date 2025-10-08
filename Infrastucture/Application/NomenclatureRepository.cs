using Domain.DAL.Nomenclatures;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastucture.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture.Application
{
	public class NomenclatureRepository : INomenclatureRepository
	{
		private readonly IDbContext _dbContext;

		public NomenclatureRepository(IDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<ICollection<Nomenclature>> GetAllNomenclatures(CancellationToken cancellationToken = default)
		{
			var res = await _dbContext.Nomenclatures
				.AsNoTracking()
				.Include(n => n.Gosts)
				.Include(n => n.Manufacturer)
				.Include(n => n.SteelGrade)
				.Include(n => n.Remnants)
					.ThenInclude(r => r.Stock)
				.ToArrayAsync(cancellationToken);

			return res;
		}

		public async Task<ICollection<Nomenclature>> GetCollection(GetNomenclatureListRequest request, CancellationToken cancellationToken)
		{
			var query = _dbContext.Nomenclatures.AsNoTracking();

			if (!string.IsNullOrEmpty(request.Name))
				query = query.Where(n => n.Name.Contains(request.Name));

			if (request.Diameter.HasValue)
				query = query.Where(n => n.Diameter == request.Diameter);

			if (request.PipeWallThickness.HasValue)
				query = query.Where(n => n.PipeWallThickness == request.PipeWallThickness);

			//TODO add sort by stock

			query = query.Skip(request.ItemPerPage * (request.Page - 1)).Take(request.ItemPerPage);

			return await query.ToArrayAsync(cancellationToken);
		}

		public async Task<Nomenclature> GetNomenclature(string nomenclatureId, CancellationToken cancellationToken)
		{
			return await _dbContext.Nomenclatures
				.AsNoTracking()
				.Include(n => n.Gosts)
				.Include(n => n.Manufacturer)
				.Include(n => n.SteelGrade)
				.Include(n => n.Remnants)
					.ThenInclude(r => r.Stock)
				.FirstOrDefaultAsync(n => n.IdNomenclature == nomenclatureId, cancellationToken)
				?? throw new NotFound();
		}
	}
}
