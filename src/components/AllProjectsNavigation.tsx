"use client";

import Link from "next/link";

interface AllProjectsNavigationProps {
 
  categoryFilter?: string;
  page: number;
  totalPages: number;
  visiblePages: number[];
}

export function TopNavigation() {
  return (
    <>
      <style>{`
        .nav-hover {
          transition: all 0.25s;
        }
        .nav-hover:hover {
          border-color: var(--green-2);
          color: var(--green-2);
        }
      `}</style>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>

        <Link
          href="/#projects"
          className="nav-hover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
          }}
        >
          Back
        </Link>
      </div>
    </>
  );
}



export function PaginationNav({
  page,
  totalPages,
  categoryFilter,
  visiblePages,
}: {
  page: number;
  totalPages: number;
  categoryFilter?: string;
  visiblePages: number[];
}) {
  return (
    <>
      <style>{`
        .page-btn {
          transition: all 0.25s;
          display: inline-block;
        }
        .page-btn:hover {
          border-color: var(--green-2);
          color: var(--green-2);
        }
      `}</style>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', flexWrap: 'wrap' }}>
          <Link
            href={page > 1 ? `/all-projects?page=${page - 1}${categoryFilter ? `&category=${categoryFilter}` : ""}` : "#"}
            className="page-btn"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              border: '1px solid var(--border)',
              color: page > 1 ? 'var(--text)' : 'var(--muted)',
              background: 'transparent',
              cursor: page > 1 ? 'pointer' : 'not-allowed',
              opacity: page > 1 ? 1 : 0.5,
              pointerEvents: page > 1 ? 'auto' : 'none',
            }}
          >
            Prev
          </Link>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {visiblePages.map((pageNo) => (
              <Link
                key={pageNo}
                href={`/all-projects?page=${pageNo}${categoryFilter ? `&category=${categoryFilter}` : ""}`}
                className="page-btn"
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: pageNo === page ? 'none' : '1px solid var(--border)',
                  color: pageNo === page ? '#fff' : 'var(--text)',
                  background: pageNo === page ? 'var(--green)' : 'transparent',
                }}
              >
                {pageNo}
              </Link>
            ))}
          </div>
          <Link
            href={page < totalPages ? `/all-projects?page=${page + 1}${categoryFilter ? `&category=${categoryFilter}` : ""}` : "#"}
            className="page-btn"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              border: '1px solid var(--border)',
              color: page < totalPages ? 'var(--text)' : 'var(--muted)',
              background: 'transparent',
              cursor: page < totalPages ? 'pointer' : 'not-allowed',
              opacity: page < totalPages ? 1 : 0.5,
              pointerEvents: page < totalPages ? 'auto' : 'none',
            }}
          >
            Next
          </Link>
        </div>
      )}
    </>
  );
}

export default function AllProjectsNavigation({
 
  categoryFilter,
  page,
  totalPages,
  visiblePages,
}: AllProjectsNavigationProps) {
  return (
    <>
      <PaginationNav page={page} totalPages={totalPages} categoryFilter={categoryFilter} visiblePages={visiblePages} />
    </>
  );
}
