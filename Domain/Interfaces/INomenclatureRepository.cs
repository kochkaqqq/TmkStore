using Domain.DAL.Nomenclatures;
using Domain.Entities;

namespace Domain.Interfaces
{
	public interface INomenclatureRepository
	{
		Task<ICollection<Nomenclature>> GetCollection(GetNomenclatureListRequest request, CancellationToken cancellationToken = default);

		Task<Nomenclature> GetNomenclature(string nomenclatureId, CancellationToken cancellationToken = default);

		Task<ICollection<Nomenclature>> GetAllNomenclatures(CancellationToken cancellationToken = default);
	}
}
