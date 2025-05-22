// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { motion } from "framer-motion";

import { cn } from "~/lib/utils";

export function Welcome({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("flex flex-col", className)}
      style={{ transition: "all 0.2s ease-out" }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h3 className="mb-2 text-center text-3xl font-medium">
        👋 Xin chào,
      </h3>
      <div className="text-muted-foreground px-4 text-center text-lg">
        {" "}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
        DEER Agent 
        </a>
        {" "}
         là một trợ lý nghiên cứu chuyên sâu được xây dựng dựa trên các mô hình ngôn ngữ tiên tiến, giúp bạn tìm kiếm trên web, duyệt thông tin và xử lý các nhiệm vụ phức tạp.
      </div>
    </motion.div>
  );
}
