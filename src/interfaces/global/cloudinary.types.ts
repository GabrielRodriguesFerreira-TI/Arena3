interface iAudio {
  codec: string;
  bit_rate: string;
  frequency: number;
  channels: number;
  channel_layout: string;
}

interface iVideo {
  pix_format: string;
  codec: string;
  level: number;
  profile: string;
  bit_rate: string;
  dar: string;
  time_base: string;
}
export interface iUploadVideo {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: Array<unknown>;
  pages: number;
  bytes: number;
  types: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  playback_url: string;
  folder: string;
  audio: iAudio;
  video: iVideo;
  is_audio: boolean;
  frame_rate: number;
  bit_rate: number;
  duration: number;
  rotation: number;
  original_filename: string;
  nb_frames: number;
  api_key: string;
}
