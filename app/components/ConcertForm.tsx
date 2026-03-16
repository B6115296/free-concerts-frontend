import React from "react";
import { FiAward, FiSave, FiUser, FiUsers } from "react-icons/fi";
import "./../styles/concert-form.css";

interface ConcertFormData {
  concertName: string;
  totalSeats: string;
  description: string;
}

interface ConcertFormProps {
  formData: ConcertFormData;
  errors: Partial<Record<keyof ConcertFormData, string>>;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

export default function ConcertForm({
  formData,
  errors,
  loading,
  onInputChange,
  onSave
}: ConcertFormProps) {
  return (
    <div className="form-container">
      <div className="form-card">

        <div className="form-content">

          {/* Title */}
          <h2 className="form-title">
            Create
          </h2>

          {/* Divider */}
          <div className="form-divider"></div>

          {/* Row: Concert Name + Total Seats */}
          <div className="form-row">

            {/* Concert Name */}
            <div className="form-field">
              <label className="form-label">
                Concert Name
              </label>

              <input
                type="text"
                name="concertName"
                value={formData.concertName}
                onChange={onInputChange}
                placeholder="Enter concert name"
                className={`form-input ${errors.concertName ? "error" : ""}`}
              />
              {errors.concertName && (
                <span className="form-error">{errors.concertName}</span>
              )}
            </div>

            {/* Total Seats */}
            <div className="form-field">
              <label className="form-label">
                Total Seats
              </label>

              <div className="form-input-wrapper">
                <input
                  type="text"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={onInputChange}
                  placeholder="Enter total seats"
                  className={`form-input ${errors.totalSeats ? "error" : ""}`}
                />
                <FiUser className="form-input-icon" />
              </div>
              {errors.totalSeats && (
                <span className="form-error">{errors.totalSeats}</span>
              )}
            </div>

          </div>

          {/* Description */}
          <div className="form-field">
            <label className="form-label">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              placeholder="Enter concert description"
              className={`form-textarea ${errors.description ? "error" : ""}`}
              rows={4}
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              onClick={onSave}
              disabled={loading}
              className="form-submit-btn"
            >
              {loading ? (
                <>
                  <FiSave className="inline-block mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <FiSave className="inline-block mr-2" />
                  Save
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
