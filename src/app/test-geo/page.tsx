'use client';
import { useEffect, useState } from 'react';
import { fetchProvinces, fetchWards, type GeoUnit } from '@/lib/api/advisor';

export default function TestGeo() {
  const [provinces, setProvinces] = useState<GeoUnit[]>([]);
  const [wards, setWards] = useState<GeoUnit[]>([]);
  const [msg, setMsg] = useState('Đang tải...');

  useEffect(() => {
    fetchProvinces()
      .then(async (p) => {
        setProvinces(p);
        if (p.length > 0) setWards(await fetchWards(p[0].id));
        setMsg('Xong');
      })
      .catch((e) => setMsg(`Lỗi: ${e.message}`));
  }, []);

  return (
    <pre className="p-8 text-sm">
      {msg}
      {'\n\n'}Tỉnh/Thành: {JSON.stringify(provinces, null, 2)}
      {'\n\n'}Phường/Xã của tỉnh đầu tiên: {JSON.stringify(wards, null, 2)}
    </pre>
  );
}