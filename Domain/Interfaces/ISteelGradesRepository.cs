using Domain.Entities;

namespace Domain.Interfaces
{
	public interface ISteelGradesRepository
	{
		Task<ICollection<SteelGrade>> GetSteelGrades(CancellationToken cancellationToken);
	}
}
